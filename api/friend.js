import firestore from '@react-native-firebase/firestore';

export async function fetchFriendInfo(userId) {
  // const collectionRef = collection(firestoreDb, 'Friend')
  const fetched = await Promise.all([
    firestore().collection("Friend").where('following', '==', userId).get(),
    firestore().collection("Friend").where('followed', '==', userId).get(),
  ])
  // const fetched = await Promise.all([
  //   getDocs(query(collectionRef, where('following', '==', userId))),
  //   getDocs(query(collectionRef, where('followed', '==', userId))),
  // ])
  let following = [], followed = [];
  for(let fds of fetched[0].docs) {
    let data = fds.data()
    const user = await firestore().collection("User").doc(data.followed).get();
    // const user = await getDoc(doc(firestoreDb, 'User', data.followed))
    if(user.data()) data = {...data, ...user.data(), uid: user.id}
    following.push(data)
  }
  for(let fds of fetched[1].docs) {
    let data = fds.data()
    const user = await firestore().collection("User").doc(data.following).get();
    // const user = await getDoc(doc(firestoreDb, 'User', data.following))
    if(user.data()) data = {...data, ...user.data(), uid: user.id}
    followed.push(data)
  }
  return [following, followed]
}

export async function fetchFindUsers(search, userId) {
  // const ref = collection(firestoreDb, "User");
  // const q = query(ref, orderBy('email'), startAt(search), endAt(search+'\uf8ff'), limit(5));
  // const [querySnapshot] = await Promise.all([
  //   getDocs(q)
  // ])
  const querySnapshot = await firestore()
    .collection("User")
    .orderBy('email')
    .startAt(search).endAt(search+'\uf8ff')
    .limit(5).get();

  let res = []
  querySnapshot.docs.map(qsd => {
    const data = qsd.data()
    data.uid = qsd.id
    if(data.uid !== userId) res.push(data)
  })
  return res
}

export async function checkIsFriend(userId, friendId) {
  // const collectionRef = collection(firestoreDb, 'Friend')
  const fetched = await Promise.all([
    firestore().collection("Friend").where('followed', '==', friendId).limit(1).get(),
    firestore().collection("Friend").where('following', '==', friendId).limit(1).get(),
    // getDocs(query(
    //   collectionRef,
    //   where('following', '==', userId), where('followed', '==', friendId), limit(1)
    // )),
    // getDocs(query(
    //   collectionRef,
    //   where('followed', '==', userId), where('following', '==', friendId), limit(1)
    // )),
  ])
  const data1 = fetched[0].docs
  const data2 = fetched[1].docs
  return data1.length || data2.length
}

export async function addFriend(userId, friendId) {
  // const collectionRef = collection(firestoreDb, 'Friend')

  // const payload = {
  //   following: userId,
  //   followed: friendId,
  //   createdAt: Timestamp.now()
  // }
  // await addDoc(collectionRef, payload)
  await firestore().collection("Friend").add(payload);

}