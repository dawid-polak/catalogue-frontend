<script setup>
const toast = useToast();

const sqlFileForm = ref({
     isLoading: false,
     sqlFile: null,
});

const handleSqlFileSubmit = async () => {
     try {
          if (!sqlFileForm.value.sqlFile) throw new Error("File not selected");

          const url = "https://mastercatalogue.ozparts.eu/api/uploads/sql-file";

          const data = new FormData();

          const fileText = await sqlFileForm.value.sqlFile.text();

          const fileBlob = new Blob([fileText], { type: "text/plain" });

          data.append("file", fileBlob);

          const res = await fetch(url, {
               method: "POST",
               body: data,
          });
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

          return;
     }
};
</script>

<template>
     <div>
          <h1 class="text-orange-400 text-md font-thin">
               Upload the data to the database using an sql file:
          </h1>

          <UDivider class="mt-2" />

          <div class="my-4 flex gap-2">
               <UInput
                    type="file"
                    size="lg"
                    icon="i-heroicons-folder"
                    class="flex-1"
                    @change="($event) => (sqlFileForm.sqlFile = $event[0])"
               />

               <UButton variant="outline" @click="handleSqlFileSubmit"
                    >Upload</UButton
               >
          </div>
     </div>
</template>
