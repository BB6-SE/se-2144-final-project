import express, { Request, Response, NextFunction } from "express";
import axios from "axios";

import { pool } from "..";
import { Video, VideoQueryResult } from "../types/video.types";

const router = express.Router();

router.post("/", async (request: Request, response: Response) => {
  try {
    const { videoId, thumbnailUrl, title, noteId } = request.body as Video;

    if (!videoId || !thumbnailUrl || !noteId) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

    const result = await pool.query(
      `
      INSERT INTO Videos (video_id, thumbnail_url, title, note_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [videoId, thumbnailUrl, title, noteId],
    );

    response.status(200).json(result.rows[0]);
  } catch (error) {
    response.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

router.get("/suggestions", async (request: Request, response: Response) => {
  try {
    const query = request.query.q as string | undefined;

    if (!query) {
      response.status(400).json({ message: "Missing search query 'q'" });
      return;
    }

    const videoApiResponse = await axios.get<VideoQueryResult>(
      process.env.YOUTUBE_SEARCH_API_URL!,
      {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          part: "snippet",
          q: query,
          type: "videos",
          maxResults: 25,
        },
      },
    );

    const videos = videoApiResponse.data.items
      .map((item) => {
        if (item.id.videoId) {
          return {
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails.default.url,
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    response.status(200).json(videos);
  } catch (error) {
    response.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

export default router;
