import { numberToIndex } from 'utils/helper';
import juzData from '../constants/juz.json';
import surahData from '../constants/surah.json';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestoreDb } from 'db/firebase';
import { createRandomQuestion, createSurahQuestion } from 'utils/quiz';
import { QUESTION_TYPES } from '@constants/types';

/**
 * get question in 'index' with 'total' questions
 * you can include listening, translation or backward question type by
 * entering number of question for that type
 * 
 * @param {*} index 
 * @param {*} total 
 * @param {*} excludes arrah of [surahIndex,ayahIndex] ([[surahIndex,ayahIndex],])
 * @param {*} includeListening 
 * @param {*} includeTranslation 
 * @param {*} includeBackward 
 */
export async function getJuzQuestion(
  index,
  total=1,
  excludes=[],
  includeListening=0,
  includeTranslation=0,
  includeBackward=0,
) {
  let surahsToGet = juzIndexGenerator(index, total)
  let surahKeys = {}
  surahsToGet.forEach(stg => {
    const surahIdx = stg.split(':')[1]
    if(!surahKeys[surahIdx]) surahKeys[surahIdx] = true
  })
  const surahDetail = await getDocs(
    query(
      collection(firestoreDb, 'SurahDetail'),
      where('index', 'in', Object.keys(surahKeys)),
    )
  )
  let questions = []
  const surahDatas = {}
  surahDetail.docs.map(sdd => {
    const data = sdd.data()
    surahDatas[data.index] = data
  })
  surahsToGet.forEach(stg => {
    const surahAyahIdx = stg.split(':')
    const juzIndex = surahAyahIdx[0]
    const surahIndex = surahAyahIdx[1]
    const ayahIndex = surahAyahIdx[2]
    const surahData = Object.values(surahDatas).filter(sds => sds.index === surahIndex)[0]
    const question = createRandomQuestion(juzIndex, surahData, ayahIndex)
    questions.push(question)
  })
  return questions
}

/**
 * get question in 'index' with 'total' questions
 * you can include listening, translation or backward question type by
 * entering number of question for that type
 * 
 * @param {*} index 
 * @param {*} total 
 * @param {*} includeListening 
 * @param {*} includeTranslation 
 * @param {*} includeBackward 
 */
export async function getSurahQuestion(
  index,
  total=1,
  includeListening=0,
  includeTranslation=0,
  includeBackward=0,
) {
  let surahsToGet = surahIndexGenerator(index, total)
  let surahKeys = {}
  surahsToGet.forEach(stg => {
    const surahIdx = stg.split(':')[1]
    if(!surahKeys[surahIdx]) surahKeys[surahIdx] = true
  })
  const surahDetail = await getDoc(doc(firestoreDb, 'SurahDetail', index))
  const surahData = surahDetail.data()
  let questions = []

  surahsToGet.forEach(stg => {
    const surahAyahIdx = stg.split(':')
    const juzIndex = surahAyahIdx[0]
    const ayahIndex = surahAyahIdx[2]
    const question = createRandomQuestion(juzIndex, surahData, ayahIndex)
    question.juzIndex = index
    questions.push(question)
  })
  return questions
}

/**
 * receive juzIndex and
 * get random surah inside that juz
 * @param {string} juzIndex 
 * @param {number} totalResult
 */
function juzIndexGenerator(juzIndex, totalResult) {
  const result = []
  const juzTarget = juzData[Number(juzIndex)-1]
  const minSurah = Number(juzTarget.start.index)
  const maxSurah = Number(juzTarget.end.index)
  const totalSurah = (maxSurah-minSurah)
  const ayahPerSurah = totalSurah > 0 ? Math.ceil(totalResult/totalSurah): 1

  for(let ms=minSurah; ms<=maxSurah; ms++) {
    const ayahCount = surahData[ms-1].count - 1
    for(let ap=0; ap<ayahPerSurah; ap++) {
      const rand = Math.ceil(Math.random()*ayahCount)
      const key = `${juzIndex}:${numberToIndex(ms,'surah')}:${rand}`
      // might want to use object instead of array
      if(!result.includes(key)) result.push(key)
    }
  }
  while(result.length > totalResult) {
    result.splice(Math.ceil(Math.random()*result.length), 1)
  }
  return result
}

function surahIndexGenerator(surahIndex, totalResult) {
  const surahTarget = surahData[Number(surahIndex)-1]
  let result = {}
  for(let ms=0; ms<=totalResult; ms++) {
    const ayahCount = surahTarget.count - 1
    const rand = Math.ceil(Math.random()*ayahCount)
    const juz = getJuzBySurahAyah(surahIndex,rand)
    const key = `${juz}:${numberToIndex(surahIndex,'surah')}:${rand}`
    // might want to use object instead of array
    if(!result[key]) result[key] = true
  }
  return Object.keys(result)
}

function getJuzBySurahAyah(surahIndex, ayahIndex) {
  const surahTarget = surahData[Number(surahIndex)-1]
  let result
  if(surahTarget.juz.length === 1) {
    result = surahTarget.juz[0].index
  } else {
    surahTarget.juz.map(stj => {
      const startAyah = stj.verse.start.split('_')[1]
      const endAyah = stj.verse.end.split('_')[1]
      if(ayahIndex >= startAyah && ayahIndex < endAyah) result = stj.index
    })
  }
  return result
}