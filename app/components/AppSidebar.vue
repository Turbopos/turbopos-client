<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ArrowLeftRight,
  BadgeDollarSign,
  BanknoteArrowUp,
  Building,
  ChartBarStacked,
  Cog,
  HandCoins,
  Speaker,
  User,
  Users,
  UserSearch,
} from "lucide-vue-next";
import type { NavMain } from "~/types";

const props = defineProps<SidebarProps>();
const config = useRuntimeConfig().public;
const auth = useAuthStore();
const sidebar = useSidebar();

// This is sample data.
const data = computed(() => {
  const navMain: NavMain[] = [
    {
      title: "Beranda",
      url: "javascript:void(0);",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
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
          hidden: !auth.user?.is_admin,
        },
        {
          title: "Data Kategori",
          icon: ChartBarStacked,
          url: "/category",
          hidden: !auth.user?.is_admin,
        },
        {
          title: "Data Barang & Jasa",
          icon: Speaker,
          url: "/product",
          hidden: !auth.user?.is_admin,
        },
        {
          title: "Data Distributor",
          icon: Building,
          url: "/distributor",
          hidden: !auth.user?.is_admin,
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
          title: "Transaksi Penjualan & Jasa",
          url: "/sales",
          icon: BanknoteArrowUp,
        },
        {
          title: "Transaksi Stok Opname",
          url: "/opname",
          icon: HandCoins,
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
          hidden: !auth.user?.is_admin,
        },
        {
          title: "Laporan Penjualan",
          url: "/sales-transaction-report",
          icon: BanknoteArrowUp,
        },
        {
          title: "Laporan Rugi Laba",
          url: "/profit-loss-report",
          icon: BadgeDollarSign,
          hidden: !auth.user?.is_admin,
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
        {
          title: "Pengaturan",
          url: "/setting",
          icon: Cog,
        },
      ],
    },
  ];

  return {
    navMain,
  };
});

const navMains = computed(() => {
  return data.value.navMain.map((nav) => {
    return {
      ...nav,
      items: nav.items?.map((item) => {
        return {
          ...item,
          isActive: item.url === useRoute().path,
        };
      }),
    };
  });
});
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <div class="px-4 py-2">
        <h2 class="text-lg font-semibold">{{ config.APP_NAME }}</h2>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup v-for="item in navMains" :key="item.title">
        <SidebarGroupLabel>{{ item.title }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="childItem in item.items"
              :key="childItem.title"
            >
              <SidebarMenuButton
                as-child
                v-if="!childItem.hidden"
                :class="{
                  'bg-primary! text-white!': childItem.isActive,
                }"
                @click="() => sidebar.setOpenMobile(false)"
              >
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
