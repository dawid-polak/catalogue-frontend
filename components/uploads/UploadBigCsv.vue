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
     errors: undefined,
     success: false,
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
     const size = 1000;

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
     const url = "http://localhost:3000/api/uploads/rowData";

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

          loading.value.isUploading = false;
          formState.value.success = true;

          return $toast(
               "success",
               "Upload csv",
               "Data transferred successfully"
          );
     } catch (error) {
          if (error.response._data) {
               let errorData = error.response._data;

               formState.value.errors = errorData;
               loading.value.isUploading = false;

               return $toast("error", "Upload error", errorData.message);
          } else {
               return $toast("error", "Upload error", error.message);
          }
     }
};

// Function to handle try again action
const handleTryAgainBtn = async () => {
     formState.value.currentFileUpload = 0;
     formState.value.errors = undefined;
     formState.value.success = false;

     return await handleUploadData();
};

// Function to reset data in form state
const resetFormState = () => {
     formState.value.file = undefined;
     formState.value.tableName = undefined;
     formState.value.isCreateTable = false;
     formState.value.columns = undefined;
     formState.value.countPartsData = undefined;
     formState.value.currentFileUpload = 0;
     formState.value.splitData = [];
     formState.value.errors = undefined;
     formState.value.success = false;
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

          <div v-if="!formState.success">
               <!-- Upload baner -->
               <div v-if="!formState.errors">
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
                                   The file is divided into
                                   {{ formState.countPartsData }}
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

                                   <UFormGroup
                                        class="flex-1 color"
                                        label="Type"
                                   >
                                        <USelect
                                             v-model="item.type"
                                             :options="types"
                                             option-attribute="name"
                                        />
                                   </UFormGroup>
                              </div>
                         </div>
                    </UForm>

                    <!-- Progress line -->
                    <div v-else>
                         <UProgress
                              :value="formState.currentFileUpload"
                              :max="formState.countPartsData"
                              indicator
                         />
                         <h1 class="text-xs font-thin mt-4">
                              Uploading {{ formState.tableName }} ...
                         </h1>
                    </div>
               </div>

               <!-- Error baner -->
               <div v-else>
                    <h1 class="font-thin text-sm text-red-500 my-2">
                         <span class="font-normal">ERROR SERVER:</span> <br />
                         <span class="text-red-500">{{
                              formState.errors.message
                                   ? formState.errors.message
                                   : formState.errors
                         }}</span>
                    </h1>

                    <UDivider v-if="formState.errors.query" />

                    <h1
                         v-if="formState.errors.query"
                         class="font-thin text-sm my-2"
                    >
                         <span class="font-normal">QUERY:</span> <br />{{
                              formState.errors.query
                         }}
                    </h1>

                    <UDivider v-if="formState.errors.query" />

                    <div v-if="formState.errors.data" class="my-2">
                         <h1 class="font-normal uppercase text-sm my-1">
                              data where the error occurred:
                         </h1>

                         <div
                              v-for="(item, key) in formState.errors.data"
                              :key="key"
                         >
                              <div class="flex gap-2 my-1">
                                   <h1 class="font-thin text-sm flex-1">
                                        {{ key }}
                                   </h1>
                                   <h1 class="font-thin text-sm flex-1">
                                        {{ item }}
                                   </h1>
                              </div>
                         </div>
                    </div>
               </div>
          </div>

          <!-- Success baner -->
          <div v-else class="flex items-center text-green-600">
               <UIcon
                    name="i-material-symbols-light:check-circle-outline-rounded"
                    class="w-10 h-10"
               />

               <h1 class="ml-2">Data transferred successfully</h1>
          </div>

          <template #footer>
               <div class="flex justify-between items-center">
                    <UCheckbox
                         v-model="formState.isCreateTable"
                         label="Create a new table"
                         :disabled="loading.isUploading"
                    />

                    <div>
                         <UButton
                              v-if="formState.errors"
                              class="mr-2 font-light"
                              variant="ghost"
                              @click="resetFormState"
                         >
                              reset
                         </UButton>

                         <UButton
                              class="font-light"
                              :disabled="loading.isUploading"
                              @click="
                                   formState.errors
                                        ? handleTryAgainBtn()
                                        : formState.success
                                        ? resetFormState()
                                        : handleUploadData()
                              "
                         >
                              {{
                                   formState.errors
                                        ? "Try again"
                                        : formState.success
                                        ? "Back"
                                        : "Uploads"
                              }}
                         </UButton>
                    </div>
               </div>
          </template>
     </UCard>
</template>
