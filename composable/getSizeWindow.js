export const getWindowSize = () => {
     return useState("windowSize", () => {
          let width = window.innerWidth;
          let height = window.innerHeight;

          return { width, height };
     });
};
