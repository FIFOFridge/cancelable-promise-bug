export async function performUtilAsyncTask() {
    throw Error('Promise should forward error into .catch(...)')
}