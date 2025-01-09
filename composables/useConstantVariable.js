import typesColumnDb from "~/data/typesColumnDb";
import databaseAccordion from "~/data/databaseAccordion";

// The composable function, which makes it possible to retrieve constant variables
// from the data folder in the project root directory
export default function () {
     return useState("constantVariables", () => {
          return { typesColumnDb, databaseAccordion };
     });
}
