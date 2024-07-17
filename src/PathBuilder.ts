import * as path from "https://deno.land/std@0.190.0/path/mod.ts";

export class PathBuilder {
  destDir: string;

  constructor(private root: string, private lib: string) {
    this.destDir = path.join(root, `react-icons-${lib}`);
  }

  get destDirico(): string {
    return path.join(this.destDir, "ico");
  }

  get destWorkflows(): string {
    return path.join(this.destDir, ".github", "workflows");
  }

  get destpublishYml(): string {
    return path.join(this.destWorkflows, "publish.yml");
  }

  get destMod(): string {
    return path.join(this.destDir, "mod.ts");
  }

  get destDeps(): string {
    return path.join(this.destDir, "deps.ts");
  }

  get import_map(): string {
    return path.join(this.destDir, "import_map.json");
  }

  get denoConfig(): string {
    return path.join(this.destDir, "deno.jsonc");
  }

  get README(): string {
    return path.join(this.destDir, "README.md");
  }

  getIconFile(icoName: string): string {
    return path.join(this.destDirico, `${icoName}.ts`);
  }

  getDebugIcon(icoName: string): string {
    return path.join('components', `${icoName}.tsx`);
  }

}
