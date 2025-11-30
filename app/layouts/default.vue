<script lang="ts">
import "~/assets/css/tailwind.css";

export const iframeHeight = "800px";
export const description =
  "A simple sidebar with navigation grouped by section.";
</script>

<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home } from "lucide-vue-next";

const main = useMainStore();
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator
          orientation="vertical"
          class="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink as-child>
                <NuxtLink class="flex items-center gap-2" to="/dashboard">
                  <Home class="size-4"></Home>
                  Beranda
                </NuxtLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <template v-for="(breadcrumb, i) in main.breadcrumbs">
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink as-child v-if="i < main.breadcrumbs.length - 1">
                  <NuxtLink :to="breadcrumb.to">{{ breadcrumb.name }}</NuxtLink>
                </BreadcrumbLink>
                <BreadcrumbPage v-else>
                  {{ breadcrumb.name }}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <slot></slot>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
