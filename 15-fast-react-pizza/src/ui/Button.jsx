import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2  active:bg-slate-400 disabled:cursor-not-allowed text-sm ";
  const styles = {
    primary: base + "md:px-6 md:py-4 px-4 py-3",
    small: base + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "inline-block md:px-6 md:py-3.5 px-4 py-2.5 rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors hover:text-stone-800 focus:hover:text-stone-800 duration-300 hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2  active:bg-slate-400 disabled:cursor-not-allowed ",
  };
  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }
  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
