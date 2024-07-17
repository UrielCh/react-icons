# batch script

## prepare env

add fa6 pi lia

```bash
pkgs=(ai bs bi ci di fi fc fa gi go gr hi im md ri si sl tb ti wi cg io hi2 io5 tfi vsc lu rx)
pkgs=(fa6 pi lia)

pkgs=(ai bs bi ci di fi fc fa fa6 gi go gr hi im md pi ri si sl tb ti wi cg io hi2 io5 lia tfi vsc lu rx)
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
  gh release create 1.0.10 --notes "improve generator, icon update";
  cd ..;
done;
```

## init once

### create all repo
```bash
for X in ${pkgs[@]}; do
  gh repo create react-icons-$X --public --clone --description "deno fresh react-icons for $X"  --disable-issues --disable-wiki
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

## init JSR once

```bash
pkgs=(bs bi ci di fi fc fa fa6 gi go gr hi im md pi ri si sl tb ti wi cg io hi2 io5 lia tfi vsc lu rx)
pkgs=(ri si sl tb ti wi cg io hi2 io5 lia tfi)
echo "";
echo "";
for X in ${pkgs[@]}; do
  echo "";
  echo echo create $X;
  echo echo react-icons-$X;
  echo cd react-icons-$X;
  echo git add .
  echo git commit -m "'JSR migration'";
  echo git push
  echo cd ..;
  echo "";
done;
```