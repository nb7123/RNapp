package com.rnapp

import android.app.Activity
import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class EmptyActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_main)

        findViewById(R.id.btn_press).setOnClickListener{
            val intent = Intent(SplashActivity@this, SplashActivity::class.java)
            navigateUpTo(intent)
        }

        findViewById(R.id.btn_nav1).setOnClickListener{
            val intent = Intent(SplashActivity@this, MainActivity::class.java)
//            startActivity(intent)

            startSearch("Hello", true, null, true)
        }
    }

    override fun onEnterAnimationComplete() {
        Log.d("Log", "On enter animation complete")
    }

    override fun onBackPressed() {
        super.onBackPressed()

        overridePendingTransition(0, android.R.anim.slide_out_right)
    }
}
