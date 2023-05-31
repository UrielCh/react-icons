# batch script

## prepare env

```bash
pkgs="ai bs bi ci di fi fc fa gi go gr hi im md ri si sl tb ti wi cg io hi2 io5 tfi vsc lu rx"
```

## commit
```bash
for X in $pkgs; do
  echo start $X; cd react-icons-$X; git commit -avm "update doc"; git push; cd ..;
done;
```

## create all repo
```bash
for X in $pkgs; do
  gh repo create react-icons-$X --public --clone --description "deno fresh react-icons for ai"  --disable-issues --disable-wiki
done;
```

## next release
```bash
for X in $pkgs; do
  cd react-icons-$X; 
  gh release create 1.0.1 --notes "add default export, improve doc, use jsdelivr";
  cd ..;
done;
```

## status
```bash
for X in $pkgs; do
  echo start $X; cd react-icons-$X; git status; cd ..;
done;
```

## init repo
```bash
for cd in $pkgs; do
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

