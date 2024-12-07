import { Separator } from "../ui/separator";

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8 p-10">
    <div className="container mx-auto text-center">
      <h2 className="text-2xl font-bold">NoteTube</h2>
      <p className="text-sm m-2">
        AI-powered tool for notes, flashcards, and decks. Upload your notes and
        generate videos and learning material effortlessly.
      </p>
      <Separator className="my-4 bg-white" />
      <p>&copy; {new Date().getFullYear()} NoteTube. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
