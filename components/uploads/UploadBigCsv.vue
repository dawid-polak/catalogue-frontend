<script setup>
import Papa from "papaparse";

const { $toast } = useNuxtApp();

const loading = ref({
     isUploading: false,
     isParsing: false,
});

const formState = ref({
     file: undefined,
     tableName: undefined,
     isCreateTable: false,
     columns: undefined,
     countPartsData: undefined,
     currentFileUpload: 0,
     splitData: [],
});

const constantVariables = useConstantVariable();

// permanent data
const types = constantVariables.value.typesColumnDb;

// Parse csv
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

// Create columns to table form csv structure
const createColumns = (dataCsv) => {
     const firstRowFromCsv = new Object(dataCsv);

     return Object.keys(firstRowFromCsv[0]).map((item) => ({
          name: item,
          type: "text",
     }));
};

// Function to split data
const splitData = (dataCsv) => {
     const splitData = [];

     // number of lines per file
     const size = 100;

     for (let i = 0; i < dataCsv.length; i += size) {
          const partData = dataCsv.slice(i, i + size);

          splitData.push(partData);
     }

     return splitData;
};

// Create table name
const createNameTable = (fileName) => {
     const index = fileName.indexOf(".");

     if (index !== -1) {
          return fileName.substring(0, index);
     }

     return fileName;
};

// Function to handle parse data
const handleParse = async (event) => {
     try {
          loading.value.isParsing = true;

          if (event.length === 0) throw new Error("Select file");

          // Parse csv file
          const file = event[0];
          const data = await parseCSV(file);

          if (!data[0]) throw new Error("No data available");

          // Set and create columns
          formState.value.columns = createColumns(data);
          // Set split data
          formState.value.splitData = splitData(data);
          // Set conut of parts data
          formState.value.countPartsData = formState.value.splitData.length;
          // Set table name
          formState.value.tableName = createNameTable(file.name);

          return (loading.value.isParsing = false);
     } catch (error) {
          loading.value.isParsing = false;

          console.error(error);

          return $toast("error", "Parse date", error.message);
     }
};

// function to send data to db
const fetchData = async (body) => {
     const url = "https://mastercatalogue.ozparts.eu/api/uploads/rowData";

     const headers = {
          "Content-Type": "application/json",
     };

     const options = {
          method: "POST",
          headers,
          body,
     };

     return await $fetch(url, options);
};

// Function to handle upload data
const handleUploadData = async () => {
     try {
          loading.value.isUploading = true;

          let body = {
               table: formState.value.tableName,
               newTable: formState.value.isCreateTable,
               columns: formState.value.columns,
          };

          for (let i = 0; i < formState.value.splitData.length; i++) {
               const item = formState.value.splitData[i];

               body.data = item;

               const res = await fetchData(body);

               if (res.status === "success") {
                    formState.value.currentFileUpload = i;

                    continue;
               }
          }

          return (loading.value.isUploading = false);
     } catch (error) {
          console.error(error);

          loading.value.isUploading = false;

          return $toast("error", "Upload error", error.message);
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

          <UForm
               v-if="!loading.isUploading"
               :state="formState"
               class="mt-3 space-y-4"
          >
               <UFormGroup required>
                    <UInput
                         type="file"
                         size="sm"
                         icon="i-heroicons-folder"
                         :loading="loading.isParsing"
                         @change="handleParse"
                    />
               </UFormGroup>

               <UFormGroup required>
                    <UInput
                         v-model="formState.tableName"
                         class="my-2"
                         placeholder="Database table name"
                         :disabled="loading.isParsing"
                    />
               </UFormGroup>

               <div
                    v-if="formState.columns"
                    class="flex justify-between text-orange-400"
               >
                    <h1 class="text-sm">Set column properties:</h1>
                    <h1 class="text-sm">
                         The file is divided into {{ formState.countPartsData }}
                    </h1>
               </div>

               <div>
                    <div
                         v-for="(item, index) in formState.columns"
                         :key="index"
                         class="flex gap-2 my-3"
                    >
                         <UFormGroup class="flex-1" label="Name">
                              <UInput v-model="item.name" />
                         </UFormGroup>

                         <UFormGroup class="flex-1 color" label="Type">
                              <USelect
                                   v-model="item.type"
                                   :options="types"
                                   option-attribute="name"
                              />
                         </UFormGroup>
                    </div>
               </div>
          </UForm>

          <div v-else>
               <UProgress
                    :value="formState.currentFileUpload"
                    :max="formState.countPartsData"
                    indicator
               />
          </div>

          <template #footer>
               <div class="flex justify-between items-center">
                    <UCheckbox
                         v-model="formState.isCreateTable"
                         label="Create a new table"
                         :disabled="loading.isUploading"
                    />
                    <UButton
                         class="font-light"
                         :disabled="loading.isUploading"
                         @click="handleUploadData"
                         >Upload</UButton
                    >
               </div>
          </template>
     </UCard>
</template>
