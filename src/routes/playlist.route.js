import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    deletePlaylist,
    removeVideoFromPlaylist,
    updatePlaylist
} from '../controllers/playlist.controller.js'

const router = express.Router()

router.use(authMiddleware);

router.route('/create').post(createPlaylist)
router.route('/user/:userId').get(getUserPlaylists)
router.route('/:playlistId').get(getPlaylistById)
router.route('/add/:videoId/:playlistId').patch(addVideoToPlaylist)
router.route('/delete/:playlistId').delete(deletePlaylist)
router.route('remove/:videoId/:playlistId').patch(removeVideoFromPlaylist)
router.route('/update/:playlistId').patch(updatePlaylist)

export default router