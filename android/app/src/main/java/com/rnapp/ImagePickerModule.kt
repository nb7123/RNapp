package com.rnapp

import android.app.Activity
import android.content.Intent

import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Created by michael on 17-7-25.
 */

class ImagePickerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var mPickerPromise: Promise? = null

    private val mActivityEventListener = object : BaseActivityEventListener() {

        override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, intent: Intent?) {
            if (requestCode == IMAGE_PICKER_REQUEST) {
                if (mPickerPromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        mPickerPromise!!.reject(E_PICKER_CANCELLED, "Image picker was cancelled")
                    } else if (resultCode == Activity.RESULT_OK) {
                        val uri = intent!!.data

                        if (uri == null) {
                            mPickerPromise!!.reject(E_NO_IMAGE_DATA_FOUND, "No image data found")
                        } else {
                            mPickerPromise!!.resolve(uri.toString())
                        }
                    }

                    mPickerPromise = null
                }
            }
        }
    }

    init {

        // Add the listener for `onActivityResult`
        reactContext.addActivityEventListener(mActivityEventListener)
    }

    override fun getName(): String {
        return "ImagePickerModule"
    }

    @ReactMethod
    fun pickImage(promise: Promise) {
        val currentActivity = currentActivity

        if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist")
            return
        }

        // Store the promise to resolve/reject when picker returns data
        mPickerPromise = promise

        try {
            val galleryIntent = Intent(Intent.ACTION_PICK)

            galleryIntent.type = "image/*"

            val chooserIntent = Intent.createChooser(galleryIntent, "Pick an image")

            currentActivity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST)
        } catch (e: Exception) {
            mPickerPromise!!.reject(E_FAILED_TO_SHOW_PICKER, e)
            mPickerPromise = null
        }

    }

    companion object {

        private val IMAGE_PICKER_REQUEST = 467081
        private val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
        private val E_PICKER_CANCELLED = "E_PICKER_CANCELLED"
        private val E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER"
        private val E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND"
    }
}
