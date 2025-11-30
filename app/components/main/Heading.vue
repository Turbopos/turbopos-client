<script lang="ts" setup>
const appName = useRuntimeConfig().public.APP_NAME;
import { ArrowLeft } from "lucide-vue-next";

const props = defineProps<{
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbValue[];
  back?: boolean;
}>();

const router = useRouter();
const main = useMainStore();

function handleSeoMeta() {
  useSeoMeta({
    title: `${appName} - ${props.title}`,
    description: props.description,
  });
}

function handleBreadcrumb() {
  if (props.breadcrumbs) {
    main.setBreadcrumbs(props.breadcrumbs);
  } else {
    main.setBreadcrumbs([]);
  }
}

const pageTitle = computed(() => {
  return appName + " - " + props.title;
});

watch(() => [props.title, props.description], handleSeoMeta);
watch(() => props.breadcrumbs, handleBreadcrumb);

onMounted(() => {
  handleSeoMeta();
  handleBreadcrumb();
});
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta property="og:title" :content="pageTitle"></Meta>

    <Meta property="og:description" :content="props.description"></Meta>
    <Meta property="description" :content="props.description"></Meta>
  </Head>

  <div class="flex items-center justify-between gap-4 flex-wrap">
    <div>
      <Button v-if="back" variant="outline" @click="router.back" class="mb-2">
        <ArrowLeft class="size-4"></ArrowLeft>
        Kembali
      </Button>
      <h1 class="text-xl font-semibold">
        {{ title }}
      </h1>
      <p v-if="description" class="text-sm text-muted-foreground">
        {{ description }}
      </p>
    </div>
    <slot name="actions"></slot>
  </div>
</template>
