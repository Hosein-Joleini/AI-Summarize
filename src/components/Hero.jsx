import { logo } from "../assets/index";

const Hero = () => {
  return (
    <header className="w-full flex flex-col items-center gap-12 pt-3">
      <nav className="flex w-full items-center justify-between">
        <img src={logo} alt="Logo" width="110" height="24" />
        <button className="black_btn">GitHub</button>
      </nav>
      <div className="flex flex-col items-center">
        <h1 className="head_text">
          Summarize Articles with
          <br className="max-sm:hidden" />{" "}
          <span className="orange_gradient bg-clip-text">OpenAI GPT-4</span>
        </h1>
        <h2 className="desc">
          Simplify your reading with Summize, an open-source article summarizer
          that transforms lengthy articles into clear and concise summaries
        </h2>
      </div>
    </header>
  );
};

export default Hero;
