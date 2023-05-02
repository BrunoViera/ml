import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchValue) {
      return;
    }
    router.push(`/items?q=${searchValue}`);
  };

  useEffect(() => {
    if (!router.query.q) {
      setSearchValue("");
    }
  }, [router.query]);

  return (
    <header className="search">
      <div className="search__wrapper">
        <Link href="/">
          <picture className="search__wrapper-logo">
            <source srcSet="/assets/Logo_ML@2x.png 2x" />
            <source srcSet="/assets/Logo_ML.png" />
            <img src="/assets/Logo_ML.png" alt="logo" />
          </picture>
        </Link>

        <form className="search__form" onSubmit={onSubmit}>
          <input
            className="search__form-input"
            type="text"
            placeholder="Nunca dejes de buscar"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="search__form-button" type="submit">
            <picture className="">
              <source srcSet="/assets/ic_Search@2x.png 2x" />
              <source srcSet="/assets/ic_Search.png" />
              <img src="/assets/Logo_ML.png" alt="logo" />
            </picture>
          </button>
        </form>
      </div>
    </header>
  );
}