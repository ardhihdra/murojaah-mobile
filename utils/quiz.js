import { QUESTION_TYPES } from "@constants/types";

export function createRandomQuestion(juzIndex, surahDetailInfo, ayahIndex) {
  const ran = Math.random()*100
  if(ran < 50) return createAyahAfterQuestion(juzIndex, surahDetailInfo, ayahIndex)
  else if(ran < 80) return createConstructAyahQuestion(juzIndex, surahDetailInfo, ayahIndex)
  else return createAyahBeforeQuestion(juzIndex, surahDetailInfo, ayahIndex)
}

export function createSurahQuestion(type, juzIndex, surahDetailInfo, ayahIndex) {
  switch(type) {
    case QUESTION_TYPES.AYAH_AFTER:
      return createAyahAfterQuestion(juzIndex, surahDetailInfo, ayahIndex)
    case QUESTION_TYPES.CONSTRUCT_AYAH:
      return createConstructAyahQuestion(juzIndex, surahDetailInfo, ayahIndex)
    default: 
      return createAyahAfterQuestion(juzIndex, surahDetailInfo, ayahIndex)
  }
}

function createOptionFrom(totalVerses, ayahIndexNumber, verse, answer) {
  const maxOptions = Math.min(totalVerses-2,4)
  let included = {}
  let options = []
  let preventer = 0
  while(Object.keys(options).length < maxOptions-1) {
    preventer++;
    const ran = Math.floor(Math.random()*(totalVerses))
    if(ran !== ayahIndexNumber && ran !== ayahIndexNumber-1) {
      if(verse[`verse_${ran}`] && !included[ran]) {
        options.push(verse[`verse_${ran}`])
        included[ran] = true
      }
    }
    if(preventer > 100) break
  }
  const answerPosition = Math.floor(Math.random()*maxOptions)
  options.splice(answerPosition, 0, answer);
  return [options,answerPosition]
}

function createAyahBeforeQuestion(juzIndex, surahDetailInfo, ayahIndex) {
  const { index, name, verse } = surahDetailInfo
  const totalVerses = Object.keys(verse).length
  ayahIndex = ayahIndex === 1 ? ayahIndex + 1: ayahIndex
  const ayahIndexNumber = Number(ayahIndex)
  const ayah = verse[`verse_${ayahIndex}`]
  const ayahBefore = verse[`verse_${ayahIndexNumber-1}`]
  const [options,answer] = createOptionFrom(totalVerses, ayahIndexNumber, verse, ayahBefore)

  return {
    id: `${juzIndex}:${index}:${ayahIndex}`,
    type: QUESTION_TYPES.AYAH_BEFORE,
    question: 'ayah_before_question',
    quranQuestion: ayah,
    options: options,
    answer: answer,
  }
}

function createAyahAfterQuestion(juzIndex, surahDetailInfo, ayahIndex) {
  const { index, name, verse } = surahDetailInfo
  const totalVerses = Object.keys(verse).length
  ayahIndex = ayahIndex === totalVerses ? ayahIndex - 1: ayahIndex
  const ayahIndexNumber = Number(ayahIndex)
  const ayah = verse[`verse_${ayahIndex}`]
  const ayahAfter = verse[`verse_${ayahIndexNumber+1}`]
  const [options,answer] = createOptionFrom(totalVerses, ayahIndexNumber, verse, ayahAfter)

  return {
    id: `${juzIndex}:${index}:${ayahIndex}`,
    type: QUESTION_TYPES.AYAH_AFTER,
    question: 'ayah_after_question',
    quranQuestion: ayah,
    options: options,
    answer: answer,
  }
}

function shuffleArray(array) {
  let result = [...array] 
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result
}

function createConstructAyahQuestion(juzIndex, surahDetailInfo, ayahIndex) {
  const MAX_OPTIONS = 7
  const { index, name, verse } = surahDetailInfo
  const ayahIndexNumber = Number(ayahIndex)
  const ayah = verse[`verse_${ayahIndex}`]
  let perWords = ayah.split(' ')
  //remove one hurf split
  for(let [idx,pw] of perWords.entries()) {
    if(pw.length === 1 && idx < perWords.length - 1) {
      const newOpt = `${perWords[idx]} ${perWords[idx+1]}`
      perWords.splice(idx,2,newOpt)
    }
  }
  while(perWords.length > MAX_OPTIONS) {
    const ran = Math.floor(Math.random()*(perWords.length-1))
    const newOpt = `${perWords[ran]} ${perWords[ran+1]}`
    perWords.splice(ran,2,newOpt)
  }
  const question = {
    id: `${juzIndex}:${index}:${ayahIndex}`,
    type: QUESTION_TYPES.CONSTRUCT_AYAH,
    question: 'construct_ayah',
    quranQuestion: shuffleArray(perWords.map((pw,idx) => idx)),
    words: perWords,
    answer: perWords.map((pw,idx) => idx),
  }
  return question
}