import "/src/styles/app.scss"
import React, { useEffect, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useData } from "/src/providers/DataProvider.jsx"
import Portfolio from "/src/components/Portfolio.jsx"
import { AnimatedCursor } from "/src/components/feedbacks/AnimatedCursor"
import ActivitySpinner from "/src/components/feedbacks/ActivitySpinner.jsx"
import ImageCache from "/src/components/generic/ImageCache.jsx"
import YoutubeModal from "/src/components/modals/YoutubeModal.jsx"
import GalleryModal from "/src/components/modals/GalleryModal.jsx"
import Notifications from "/src/components/feedbacks/Notifications.jsx"
import ConfirmationWindow from "/src/components/modals/ConfirmationWindow.jsx"
import { useFeedbacks } from "/src/providers/FeedbacksProvider.jsx"
const Counter = React.lazy(() => import('./Counter'));

function App() {
    const { listImagesForCache } = useData()
    const imageList = listImagesForCache()

    useEffect(() => {
        fetch('https://us-central1-portfolio-368f0.cloudfunctions.net/incrementVisit')
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error incrementing visit counter:', error));
    }, []);

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <AppFeedbacks />
                <ImageCache urls={imageList} />
                <Routes>
                    <Route path="/" element={<Portfolio />} />
                    <Route path="/counter" element={
                        <Suspense fallback={<div>Loading counter...</div>}>
                            <Counter />
                        </Suspense>
                    } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
function AppFeedbacks() {
    const {
        listSpinnerActivities,
        isAnimatedCursorEnabled,
        isAnimatedCursorActive,
        isModalOpen,
        displayingNotification,
        killNotification,
        displayingYoutubeVideo,
        hideYoutubeVideo,
        displayingGallery,
        hideGallery,
        pendingConfirmation,
        hideConfirmationDialog
    } = useFeedbacks()


    const spinnerActivities = listSpinnerActivities()
    const animatedCursorEnabled = isAnimatedCursorEnabled()
    const animatedCursorActive = isAnimatedCursorActive()
    const modalOpen = isModalOpen()

    return (
        <>
            {spinnerActivities && (
                <ActivitySpinner activities={spinnerActivities}/>
            )}

            {isAnimatedCursorEnabled() && (
                <AnimatedCursor enabled={animatedCursorEnabled}
                                active={animatedCursorActive}
                                modalOpen={modalOpen}/>
            )}

            {displayingNotification && (
                <Notifications displayingNotification={displayingNotification}
                               killNotification={killNotification}/>
            )}


            <YoutubeModal   displayingYoutubeVideo={displayingYoutubeVideo}
                            hideYoutubeVideo={hideYoutubeVideo}/>



            <GalleryModal   displayingGallery={displayingGallery}
                            hideGallery={hideGallery}/>



            <ConfirmationWindow pendingConfirmation={pendingConfirmation}
                                hideConfirmationDialog={hideConfirmationDialog}/>
        </>
    )
}

export default App
