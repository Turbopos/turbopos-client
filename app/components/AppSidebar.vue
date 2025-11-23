<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";
import SearchForm from "@/components/SearchForm.vue";
import VersionSwitcher from "@/components/VersionSwitcher.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  ArrowLeftRight,
  BadgeDollarSign,
  BanknoteArrowUp,
  Building,
  ChartBarStacked,
  Speaker,
  User,
  Users,
  UserSearch,
} from "lucide-vue-next";
import type { NavMain } from "~/@types";

const props = defineProps<SidebarProps>();

// This is sample data.
const data: {
  versions: string[];
  navMain: NavMain[];
} = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Beranda",
      url: "javascript:void(0);",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          isActive: true,
          icon: User,
        },
      ],
    },
    {
      title: "Master Data",
      url: "javascript:void(0);",
      items: [
        {
          title: "Data Karyawan",
          icon: Users,
          url: "/user",
        },
        {
          title: "Data Kategori",
          icon: ChartBarStacked,
          url: "/category",
        },
        {
          title: "Data Barang & Jasa",
          icon: Speaker,
          url: "/product",
        },
        {
          title: "Data Distributor",
          icon: Building,
          url: "/distributor",
        },
        {
          title: "Data Customer",
          icon: UserSearch,
          url: "/customer",
        },
      ],
    },
    {
      title: "Transaksi",
      url: "javascript:void(0);",
      items: [
        {
          title: "Transaksi Pembelian",
          url: "/purchase-order",
          icon: ArrowLeftRight,
        },
        {
          title: "Transaksi Penjualan Servis",
          url: "/sales",
          icon: BanknoteArrowUp,
        },
      ],
    },
    {
      title: "Laporan",
      url: "javascript:void(0);",
      items: [
        {
          title: "Laporan Pembelian",
          url: "/purchase-order-report",
          icon: ArrowLeftRight,
        },
        {
          title: "Laporan Penjualan",
          url: "/sales-report",
          icon: BanknoteArrowUp,
        },
        {
          title: "Laporan Rugi Laba",
          url: "/profit-loss-report",
          icon: BadgeDollarSign,
        },
        {
          title: "Laporan Stok Produk",
          url: "/stock-report",
          icon: Speaker,
        },
      ],
    },
    {
      title: "Pengaturan",
      url: "javascript:void(0);",
      items: [
        {
          title: "Profil",
          url: "/profile",
          icon: User,
        },
      ],
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <VersionSwitcher
        :versions="data.versions"
        :default-version="data.versions[0]!"
      />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup v-for="item in data.navMain" :key="item.title">
        <SidebarGroupLabel>{{ item.title }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="childItem in item.items"
              :key="childItem.title"
            >
              <SidebarMenuButton as-child :is-active="childItem.isActive">
                <NuxtLink :to="childItem.url" class="flex items-center gap-2">
                  <component
                    v-if="childItem.icon"
                    class="size-4"
                    :is="childItem.icon"
                  />
                  {{ childItem.title }}
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
