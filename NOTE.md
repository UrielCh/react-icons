# batch script

## prepare env

```bash
pkgs=(ai bs bi ci di fi fc fa gi go gr hi im md ri si sl tb ti wi cg io hi2 io5 tfi vsc lu rx)
```

## maintains

### all clone

```bash
for X in ${pkgs[@]}; do
  git clone git@github.com:UrielCh/react-icons-$X.git
done;
```

### status
```bash
for X in ${pkgs[@]}; do
  echo start $X; cd react-icons-$X; git status; cd ..;
done;
```

### diff
```bash
for X in ${pkgs[@]}; do
  echo start $X; cd react-icons-$X; git diff; cd ..;
done;
```

### commit
```bash
for X in ${pkgs[@]}; do
  echo start $X; cd react-icons-$X; git add .; git commit -avm "order icons by name"; git push; cd ..;
done;
```

### next release
```bash
for X in ${pkgs[@]}; do
  echo start $X; 
  cd react-icons-$X; 
  git add .; git commit -avm "add non commiter files";
  git push;
  gh release create 1.0.9 --notes "improve generator, icon update";
  cd ..;
done;
```

## init once

### create all repo
```bash
for X in ${pkgs[@]}; do
  gh repo create react-icons-$X --public --clone --description "deno fresh react-icons for ai"  --disable-issues --disable-wiki
done;
```

### init repo
```bash
for X in ${pkgs[@]}; do
  echo start $X;
  cd react-icons-$X;
  git init;
  git add .;
  git commit -m "initial commit";
  git branch -M main;
  git push --set-upstream origin main;
  cd ..;
done;
```

