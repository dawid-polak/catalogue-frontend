<script setup>
import Papa from "papaparse";

const toast = useToast();
const isLoadingParse = ref(false);
const numberOfParts = ref(undefined);
const formatFile = ref(undefined);
const databaseTableName = ref();

const parseCSV = (file) => {
     return new Promise((resolve, reject) => {
          Papa.parse(file, {
               header: true,
               dynamicTyping: true,
               complete: (results) => {
                    resolve(results.data);
               },
               error: (error) => {
                    reject(error);
               },
          });
     });
};

const handleParse = async (event) => {
     try {
          if (event.length === 0) throw new Error("Select file");

          isLoadingParse.value = true;
          numberOfParts.value = undefined;
          databaseTableName.value = "";

          const file = event[0];

          const data = await parseCSV(file);

          if (!data) throw new Error("No data available");

          const firstRow = new Object(data[0]);
          const splitData = [];
          const size = 10000;

          for (let i = 0; i < data.length; i += size) {
               const partData = data.slice(i, i + size);

               splitData.push(partData);
          }

          numberOfParts.value = splitData.length;
          formatFile.value = Object.keys(firstRow);
          databaseTableName.value = file.name;

          console.log(data);
          console.log(splitData);

          isLoadingParse.value = false;
     } catch (error) {
          console.error(error);

          toast.add({
               id: "update_downloaded",
               title: "Server error",
               description: error.message,
               icon: "i-mdi-light:alert-octagon",
               timeout: 3000,
               color: "red",
               pauseTimeoutOnHover: false,
          });
     }
};
</script>

<template>
     <UCard>
          <template #header>
               <div class="flex items-center">
                    <UIcon
                         name="i-material-symbols-light:csv-outline-rounded"
                         class="w-5 h-5"
                    />
                    <h1 class="ml-2 text-md font-thin">Parse CSV</h1>
               </div>
          </template>

          <UInput
               type="file"
               size="sm"
               icon="i-heroicons-folder"
               :loading="isLoadingParse"
               @change="handleParse"
          />

          <UForm class="mt-6 space-y-4">
               <UFormGroup required>
                    <UInput
                         v-model="databaseTableName"
                         class="my-2"
                         placeholder="Database table name"
                         :disabled="isLoadingParse"
                    />
               </UFormGroup>
          </UForm>

          <div v-if="numberOfParts">
               <div
                    class="flex justify-between items-center py-4 mt-4 text-sm font-thin"
               >
                    <h1 class="">Structure of file (columns):</h1>

                    <h1 v-if="numberOfParts" class="">
                         The file is divided into {{ numberOfParts }} parts
                    </h1>
               </div>

               <!-- <UDivider /> -->
               <div class="flex overflow-auto my-2">
                    <span
                         v-for="key in formatFile"
                         :key="key"
                         class="px-4 flex justify-center items-center text-sm text-nowrap text-orange-400 border-l-[1px] border-gray-800"
                         >{{ key }}
                         <UDivider orientation="vertical" />
                    </span>
               </div>

               <!-- <UDivider /> -->
          </div>

          <template #footer>
               <div class="flex justify-between items-center">
                    <UCheckbox
                         label="Create a new table"
                         :disabled="isLoadingParse"
                    />
                    <UButton class="font-light" :disabled="isLoadingParse"
                         >Upload</UButton
                    >
               </div>
          </template>
     </UCard>
</template>
