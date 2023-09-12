import { useEffect, useState } from "react";
import { useLazyGetSummaryQuery } from "../services/article";

import { linkIcon, copy, tick, loader } from "../assets/index";

const Demo = () => {
  const [getSummary, { isFetching, error }] = useLazyGetSummaryQuery();

  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const allArticlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (allArticlesFromLocalStorage) {
      setAllArticles(allArticlesFromLocalStorage);
    }
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedArticles);

      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    }
  };

  const inputChangeHandler = (event) => {
    setArticle((prevState) => {
      return { ...prevState, url: event.target.value };
    });
  };

  const copyClickHandler = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="max-w-xl w-full flex flex-col mt-16 items-center justify-start">
      <div className="flex flex-col w-full relative gap-3">
        <form
          onSubmit={submitHandler}
          className="relative flex items-center justify-center"
        >
          <img
            src={linkIcon}
            alt="Link Icon"
            className="w-[22px] h-[22px] absolute left-0 ml-3 object-contain"
          />
          <input
            type="url"
            className="url_input peer"
            value={article.url}
            placeholder="Paste the article link"
            required
            onChange={inputChangeHandler}
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border peer-focus:border-gray-800"
          >
            ↵
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              className="link_card"
              onClick={() => {
                setArticle(item);
              }}
            >
              <div
                className="copy_btn"
                onClick={() => copyClickHandler(item.url)}
              >
                <img src={copied === item.url ? tick : copy} alt="Copy Icon" />
              </div>
              <p className="flex-1 text-blue-700 truncate text-sm font-medium">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3 items-center my-10 max-w-full">
        {isFetching ? (
          <div className="mt-5 flex items-center justify-center">
            <img
              src={loader}
              alt="Loader"
              className="w-[40%] h-[40%] object-contain"
            />
          </div>
        ) : error ? (
          <div>
            <p className="text-black font-bold text-lg">
              Oops Something went wrong!
            </p>
            <p className="font-medium text-gray-700 text-lg">
              {error.data.error}
            </p>
          </div>
        ) : article.summary ? (
          <div>
            <h2 className="font-satoshi text-xl font-semibold mb-3 text-gray-700">
              Article <span className="blue_gradient">Summary</span>
            </h2>
            <div className="summary_box">
              <p className="font-inter text-sm text-gray-700 font-medium leading-normal">
                {article.summary}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Demo;
