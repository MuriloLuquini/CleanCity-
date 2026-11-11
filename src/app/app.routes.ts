import { Routes } from "@angular/router";
export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/home").then((m) => m.Home),
    title: "Início | Raxadinha",
  },
  {
    path: "sobre",
    loadComponent: () => import("./features/sobre/sobre").then((m) => m.Sobre),
    title: "Sobre | Raxadinha",
  },
  {
    path: "campanhas",
    loadComponent: () =>
      import("./features/campanhas/campanhas").then((m) => m.Campanhas),
    title: "Conteúdos | Raxadinha",
  },
  {
    path: "campanhas/:id",
    loadComponent: () =>
      import("./features/detalhe-campanha/detalhe-campanha").then(
        (m) => m.DetalheCampanha,
      ),
    title: "Detalhes do conteúdo | Raxadinha",
  },
  {
    path: "admin",
    loadComponent: () => import("./features/admin/admin").then((m) => m.Admin),
    title: "Admin | Raxadinha",
  },
  {
    path: "admin/form",
    loadComponent: () =>
      import("./features/manutencao-campanha/manutencao-campanha").then(
        (m) => m.ManutencaoCampanha,
      ),
    title: "Novo conteúdo | Raxadinha",
  },
  {
    path: "admin/form/:id",
    loadComponent: () =>
      import("./features/manutencao-campanha/manutencao-campanha").then(
        (m) => m.ManutencaoCampanha,
      ),
    title: "Editar conteúdo | Raxadinha",
  },
  { path: "**", redirectTo: "" },
];
