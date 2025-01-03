import typesColumnDb from "~/data/typesColumnDb";

// The composable function, which makes it possible to retrieve constant variables
// from the data folder in the project root directory
export default function () {
     return useState("constantVariables", () => {
          return { typesColumnDb };
     });
}
