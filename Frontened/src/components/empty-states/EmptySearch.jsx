import { useNavigate } from "react-router-dom";

const EmptySearch = ({ query }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      {/* Icon */}
      <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mb-6">
        <span
          className="material-symbols-outlined text-[52px] text-on-surface-variant"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          search_off
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-headline-lg font-bold text-on-surface">
        No results found
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-body-md text-on-surface-variant leading-relaxed">
        We couldn't find any videos matching{" "}
        <span className="font-semibold text-on-surface">
          "{query}"
        </span>.
        <br />
        Try searching with different keywords or check the spelling.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 rounded-full bg-primary text-on-primary font-medium transition hover:opacity-90"
      >
        Explore Videos
      </button>
    </div>
  );
};

export default EmptySearch;