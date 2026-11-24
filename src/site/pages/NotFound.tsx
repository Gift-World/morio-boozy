import { Link } from "react-router-dom";
import { Icon } from "../icons";

export function NotFoundPage() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-morio-deep">
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mist/10 blur-3xl" />
      <div className="container-site py-40 text-center">
        <p className="eyebrow mb-6">Hiyo haiwez make</p>
        <h1 className="display text-display-xl text-bone">404</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-bone/80">
          The page you’re looking for doesn’t exist. It may have been moved or removed altogether.
        </p>
        <Link to="/" className="btn-primary mt-10">
          Back to home <Icon name="arrow" />
        </Link>
      </div>
    </section>
  );
}
