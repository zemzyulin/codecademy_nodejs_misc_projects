// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function
const pAequorFactory = (num, arr) => {
  const organism = {
    specimenNum: num,
    dna: arr,
    // organism's methods
    mutate() {
      const randomIndex = Math.floor((Math.random() * 15));
      const oldBase = this.dna[randomIndex];
      let newBase;
      do {
        newBase = returnRandBase();
        console.log(newBase);
      } while (newBase === oldBase);
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(pAequor) {
      let o2 = pAequorFactory(pAequor, mockUpStrand());
      let matches = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === o2.dna[i]) {
          matches++;
        }
      }
      console.log(`Specimen #1 and specimen #2 have ${Math.round(matches / this.dna.length * 100)}% DNA in common`);
    },
    willLikelySurvive() {
      let matches = 0;
      this.dna.forEach(element => {
        if (element === 'C' || element === 'G') {
          matches++;
        }
      });
      console.log(matches);
      console.log(this.dna);
      return (matches / this.dna.length > 0.6) ? true : false;
    }
  }
  return organism;
}

// Create 30 instances
const finalArray = [];
let counter = 0;
let tmpOrganism;
while (counter < 30) {
  tmpOrganism = pAequorFactory('pAequor' + counter, mockUpStrand());
  if (tmpOrganism.willLikelySurvive()) {
    finalArray.push(tmpOrganism);
    counter++;
  }
}








