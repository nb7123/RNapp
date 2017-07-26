package com.rnapp

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Created by michael on 17-7-26.
 */
class SimpleModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "SimpleModule"
    }

    @ReactMethod
    fun navTo(moduleName: String) {
        val intent = Intent(currentActivity, ContentActivity::class.java)
        intent.putExtra(ContentActivity.EXTRA_MODULE_NAME, moduleName)

        currentActivity?.startActivity(intent)
    }
}