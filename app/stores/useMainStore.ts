interface SetSeoMetaProps {
  title: string;
  description?: string;
}

export interface BreadcrumbValue {
  name: string;
  to: string;
}

export default defineStore("main", () => {
  const appName = useRuntimeConfig().public.name;

  const title = ref(appName as string);
  const description = ref("");
  const breadcrumbs = ref<Array<BreadcrumbValue>>([]);

  function setSeoMeta(props: SetSeoMetaProps) {
    title.value = props.title;
    if (props.description) {
      description.value = props.description;
    }
  }

  function setBreadcrumbs(values: BreadcrumbValue[]) {
    breadcrumbs.value = values;
  }

  return {
    title,
    description,
    breadcrumbs,
    setSeoMeta,
    setBreadcrumbs,
  };
});
