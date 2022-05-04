@echo "Iniciando seervidores"
cd client
start PowerShell.exe -Command "npm start"
cd ..
cd api
start PowerShell.exe -Command "npm start"
