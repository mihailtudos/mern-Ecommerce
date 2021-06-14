const products = [
  {
    name: 'GREEN LINE 120 aluminiu PC - Bidon 20L ',
    image: '/images/120_aluminiu.jpg',
    description: "Bidon 20L aluminiu",
    brand: 'GREENLINE',
    category: 'Aparat de muls',
    price: 1599,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    mulgotorCharacteristics: {
      enginePower: 0.55,
      rotations: 1440,
      debit: 180,
      capacityMin: 8,
      capacityMax: 10,
      handleType: "Graphite",
      dimensions: "70 x 43 x 4.9",
      vacuumType: "nu include",
      weight: 39,
    }
  },
  {
    name: 'GREEN LINE 130 INOX PC - Bidon 30L ',
    image: '/images/mulgotor_30l.png',
    description: "Bidon 20L aluminiu",
    brand: 'GREENLINE',
    category: 'Aparat de muls',
    price: 1889,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    mulgotorCharacteristics: {
      enginePower: 0.55,
      rotations: 1440,
      debit: 180,
      capacityMin: 8,
      capacityMax: 10,
      handleType: "Graphite",
      dimensions: "70 x 43 x 4.9",
      vacuumType: "nu include",
      weight: 44,
    }
  },
  {
    name: 'Motocultor Rotkat RO75R',
    image: '/images/rotkat1.jpg',
    description:
      'Pachet Camarad Motocultor Rotkat RO75R, 7 CP, benzina, plug arat, roti metalice, 2 L ulei',
    brand: 'Rotkat',
    category: 'Motocultor',
    price: 1999,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    motocultorCharacteristics: {
      fuelCapacity: 3.6,
      oilCapacity: 0.6,
      consume: 395,
      airFilter: true,
      filteringSystem: "umed",
      numberCylinders: 1,
      dimensions: "390 x 320 x 345",
      sistemDeUngere: "Barbotaj",
      modelMotor: "R210",
      tipMotor: "4 timpi, OHV, inclinat 25°",
      putereMotor: 7,
      cupluMaxim: 12,
      capacitateCilindrica: 212,
      diametruCursaPiston: "70/55",
      tipTransmisie: "Doua curele de transmisie intre motor si reductor, lant in redactor, in ulei",
      trepteViteze: "1 inainte si 1 inapoi",
      ambreaje: "Tensionare curele transmisie",
      prizaDePutere: false,
      latimeDeLucru: "560-830",
      adancimeDeLucru: 250,
      tipFreza: "3 tronsoane cu 4 cutite, segmentabile",
      rotiMetalice: 40,
      tipRoti: "Anvelope cauciuc, 4.00-8",
      garantie: 2,
    }
  },
  {
    name: 'Motocultor RO75RS, 7CP',
    image: '/images/rotkat1.jpg',
    description: "DESCRIERE: Recomandat pentru suprafețe de 500 mp 5.000 mp cu pământ dur, " +
      "argilos sau nisipos <> Compact, bine proporționat, cu centru de greutate deasupra frezelor asigurând o buna " +
      "manevrabilitate în timpul lucrului, stabilitate și vibrații reduse (nu țopăie) " +
      "<> Carcasa de transmisie din duraluminiu și greutatea motocultorului de cca. 80 kg (cu frezele montate)" +
      " ajută la lucrul pământului (reduce oboseala utilizatorului atunci când se lucrează cu frezele)" +
      "<> Apărătoare curele din plastic, nu mai vibrează în timpul mersului, dispărând zgomotul <> " +
      "Ghidon reglabil pe verticală ajută atunci când înălțimea utilizatorului cere reglarea coarnelor <> " +
      "Roți cu profil agricol 4.008 care conferă o aderența bună în momentul când este utilizat la transport" +
      " <> Sistem de transport al frezelor care ajută la deplasarea motocultorului pe roți către zona de" +
      "lucru cu frezele montate pe suportul de transport <> " +
      "Frezele segmentabile pentru lucrat solul au o lățime reglabilă atunci când sunt segmentate și " +
      "pot fi utilizate la prășitul porumbului și prasitul viei. Frezele au cuțite proiectate pentru soluri" +
      "dure, sunt prevăzute cu discuri laterale de protecție și bucșe de protecție a semeringurilor " +
      "arborelui de transmisie <> " +
      "Aripi rezistente ajustate pentru a fi folosit la toate muncile <> " +
      "Cutie scule pentru setul de chei <> " +
      "Roată transport față.",
    brand: 'Rotkat',
    category: 'Motocultor',
    price: 1880,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    motocultorCharacteristics: {
      fuelCapacity: 3.6,
      oilCapacity: 0.6,
      consume: 395,
      airFilter: true,
      filteringSystem: "umed",
      numberCylinders: 1,
      dimensions: "390 x 320 x 345",
      sistemDeUngere: "Barbotaj",
      modelMotor: "R210",
      tipMotor: "4 timpi, OHV, inclinat 25°",
      putereMotor: 7,
      cupluMaxim: 12,
      capacitateCilindrica: 212,
      diametruCursaPiston: "70/55",
      tipTransmisie: "Doua curele de transmisie intre motor si reductor, lant in redactor, in ulei",
      trepteViteze: "1 inainte si 1 inapoi",
      ambreaje: "Tensionare curele transmisie",
      prizaDePutere: false,
      latimeDeLucru: "560-830",
      adancimeDeLucru: 250,
      tipFreza: "3 tronsoane cu 4 cutite, segmentabile",
      rotiMetalice: 40,
      tipRoti: "Anvelope cauciuc, 4.00-8",
      garantie: 2,
    }
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
]

export default products;
