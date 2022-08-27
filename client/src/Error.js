import React from "react";

export const Error = () => {
  return (
    <div className="text-dark">
      <header class="top-header"></header>
      <section class="error">
        <div class="error__content">
          <div class="error__message message">
            <h1 class="message__title">Page Not Found</h1>
            <p class="message__text">
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists. Please
              try again.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
