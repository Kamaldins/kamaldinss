{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "kamaldins-dev";

  buildInputs = with pkgs; [
    nodejs_22
  ];

  shellHook = ''
    echo "Node $(node --version) / npm $(npm --version) ready."
    echo "Run: npm install && npm run dev"
  '';
}
