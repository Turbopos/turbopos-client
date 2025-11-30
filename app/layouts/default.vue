<script lang="ts">
import "~/assets/css/tailwind.css";
import ConfirmDialog from "~/components/dialog/ConfirmDialog.vue";

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
import { Home, Lock, User } from "lucide-vue-next";

const main = useMainStore();
const auth = useAuthStore();
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
        <div class="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>
                  {{ auth.user?.username.slice(0, 2).toUpperCase() }}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem as-child>
                <NuxtLink to="/profile" class="flex items-center gap-2">
                  <User class="size-4"></User>
                  Profil Saya
                </NuxtLink>
              </DropdownMenuItem>
              <ConfirmDialog
                title="Logout"
                description="Anda yakin untuk keluar? Sesi anda akan terhapus"
                @confirm="auth.logout"
                variant="destructive"
              >
                <DropdownMenuItem
                  class="text-destructive flex items-center gap-2"
                  @select="(e: any) => e.preventDefault()"
                >
                  <Lock class="size-4"></Lock>
                  Logout
                </DropdownMenuItem>
              </ConfirmDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <slot></slot>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
