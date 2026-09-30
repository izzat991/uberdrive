export type RideRoute = {
  pickup: string;
  destination: string;
  pickupMinutes: number;
  pickupKm: string;
  tripMinutes: number;
  tripKm: string;
};

// Trajetos simulados, como as solicitações e os valores exibidos pelo app.
const routes: RideRoute[] = [
  { pickup: "Rua Rodrigues de Freitas, Santíssimo", destination: "Rua Boa Fé, Inhoaíba", pickupMinutes: 9, pickupKm: "4,8", tripMinutes: 20, tripKm: "12,4" },
  { pickup: "Rua Campo Grande, Campo Grande", destination: "Estrada do Mendanha, Campo Grande", pickupMinutes: 4, pickupKm: "1,6", tripMinutes: 14, tripKm: "5,2" },
  { pickup: "Avenida de Santa Cruz, Bangu", destination: "Rua Figueiredo Camargo, Padre Miguel", pickupMinutes: 6, pickupKm: "2,3", tripMinutes: 12, tripKm: "4,1" },
  { pickup: "Estrada da Posse, Santíssimo", destination: "Estrada do Monteiro, Campo Grande", pickupMinutes: 5, pickupKm: "2,0", tripMinutes: 18, tripKm: "8,6" },
  { pickup: "Rua Felipe Cardoso, Santa Cruz", destination: "Avenida Cesário de Melo, Paciência", pickupMinutes: 7, pickupKm: "3,2", tripMinutes: 16, tripKm: "7,3" },
  { pickup: "Estrada do Magarça, Guaratiba", destination: "Estrada da Pedra, Pedra de Guaratiba", pickupMinutes: 3, pickupKm: "1,1", tripMinutes: 22, tripKm: "10,5" },
  { pickup: "Avenida das Américas, Recreio dos Bandeirantes", destination: "Avenida Lúcio Costa, Barra da Tijuca", pickupMinutes: 8, pickupKm: "3,7", tripMinutes: 24, tripKm: "13,2" },
  { pickup: "Rua Cândido Benício, Praça Seca", destination: "Estrada do Tindiba, Taquara", pickupMinutes: 5, pickupKm: "2,5", tripMinutes: 17, tripKm: "6,8" },
];

// Uma fila por sessão do App: esgota as opções antes de repetir e impede
// a repetição consecutiva também na passagem de um ciclo para o próximo.
export function createRoutePicker() {
  let remaining: RideRoute[] = [];
  let previous: RideRoute | undefined;

  return () => {
    if (remaining.length === 0) remaining = [...routes];
    const candidates = remaining.filter((route) => route !== previous);
    const selected = candidates[Math.floor(Math.random() * candidates.length)];
    remaining = remaining.filter((route) => route !== selected);
    previous = selected;
    return selected;
  };
}
