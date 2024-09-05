import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./docLoading.scss";
export const DocLoading = () => {
  return (
    <div className="doc-loading-outer">
      <div className="doc-loading">
        <DotLottieReact
          background="transparent"
          src="https://lottie.host/dd6b8926-ed74-450f-92e6-8b76b7c9a58b/13dcXHN2Y8.json"
          // src="https://lottie.host/2708619a-535c-46e7-b996-251398b10f58/iUt7ybh35K.json"
          autoplay
          loop
        />
      </div>
    </div>
  );
};
