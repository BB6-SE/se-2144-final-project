declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL?: string;
    readonly GEMINI_API_KEY?: string;
    readonly MEMORY_STORAGE_FOLDER?: string;
    readonly YOUTUBE_SEARCH_API_URL?: string;
    readonly YOUTUBE_API_KEY?: string;
  }
}
