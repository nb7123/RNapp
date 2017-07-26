package com.rnapp

import android.os.Bundle

import com.facebook.react.ReactActivity

/**
 * Created by michael on 17-7-26.
 */

class ContentActivity : ReactActivity() {
    companion object {
        val EXTRA_MODULE_NAME = "com.rnapp.EXTRA_MODULE_NAME"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        loadApp(intent.getStringExtra(EXTRA_MODULE_NAME))
    }
}
