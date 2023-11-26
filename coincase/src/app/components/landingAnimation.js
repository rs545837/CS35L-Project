import Lottie from "lottie-web";
import React from "react";

const SignUpAnimation = () => {
  const lottieRef = React.useRef(null);

  React.useEffect(() => {
    const lottieInstance = Lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      speed: 0.3,
      easing: "easeInOutQuad",
      path: "https://lottie.host/acb93228-0ab9-4e6f-8ece-b911b589d6af/MYFzYJAgEb.json",
    });

    return () => {
      lottieInstance.destroy();
    };
  }, []);

  return (
    <div
      ref={lottieRef}
      style={{ width: "300px", height: "300px", background: "#FFFFFF" }}
    />
  );
};

export default SignUpAnimation;
