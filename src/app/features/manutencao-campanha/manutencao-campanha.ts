import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CampanhasService } from "../../core/services/campanhas.service";
@Component({
  selector: "app-manutencao-campanha",
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: "./manutencao-campanha.html",
  styleUrl: "./manutencao-campanha.css",
})
export class ManutencaoCampanha {
  private fb = inject(FormBuilder);
  private campanhasService = inject(CampanhasService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: string | null = null;
  loading = false;
  loadingData = false;
  successMessage = "";
  errorMessage = "";

  form = this.fb.nonNullable.group({
    nome: ["", [Validators.required, Validators.minLength(15)]],
    icone: ["", [Validators.required]],
    cor: ["", [Validators.required]],
    resumo: ["", [Validators.required]],
    descricao: ["", [Validators.required]],
    autor: ["", [Validators.required]],
    formato: ["", [Validators.required]],
    acesso: ["", [Validators.required]],
    preco: [0, [Validators.required]],
    ativo: [true],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get("id");
    if (id) {
      this.editingId = id;
      this.loadCampanha(id);
    }
  }

  loadCampanha(id: string): void {
    this.loadingData = true;
    this.campanhasService.getById(id).subscribe({
      next: (campanha) => {
        this.form.patchValue({
          nome: campanha.nome,
          local: campanha.local,
          data: campanha.data,
          quantidadeVoluntarios: campanha.quantidadeVoluntarios,
          organizador: campanha.organizador,
          descricao: campanha.descricao,
          formato: campanha.formato,
          ativo: campanha.ativo,
        });
        this.loadingData = false;
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar conteúdo: " + error.message;
        this.loadingData = false;
      },
    });
  }

  submit(): void {
    this.successMessage = "";
    this.errorMessage = "";
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formValue = this.form.getRawValue();
    const campanhaData = {
      nome: formValue.nome,
      local: formValue.local,
      data: formValue.data,
      quantidadeVoluntarios: formValue.quantidadeVoluntarios,
      organizador: formValue.organizador,
      descricao: formValue.descricao,
      formato: formValue.formato,
      ativo: formValue.ativo,

    };
    if (this.editingId !== null) {
      this.campanhasService.update(this.editingId, campanhaData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = "Conteúdo atualizado com sucesso!";
          setTimeout(() => {
            this.router.navigate(["/admin"]);
          }, 1000);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = "Erro ao atualizar conteúdo.";
        },
      });
      return;
    }

    this.campanhasService.create(campanhaData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = "Conteúdo criado com sucesso!";
        this.form.reset();
        setTimeout(() => {
          this.router.navigate(["/admin"]);
        }, 1000);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "Erro ao criar conteúdo.";
      },
    });
  }
}
