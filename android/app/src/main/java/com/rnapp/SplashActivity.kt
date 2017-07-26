package com.rnapp

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import okhttp3.OkHttpClient
import okhttp3.Request
import org.jetbrains.anko.async
import org.jetbrains.anko.uiThread
import java.io.File
import java.io.FileOutputStream

/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 */
class SplashActivity : Activity() {
    companion object {
        val client = OkHttpClient.Builder().build()
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_splash)
    }

    override fun onPostCreate(savedInstanceState: Bundle?) {
        super.onPostCreate(savedInstanceState)

        // Trigger the initial hide() shortly after the activity has been
        // created, to briefly hint to the user that UI controls
        // are available.

        async {
            val req = Request.Builder().url("http://qiniu.iyxsy.com/bundle.android.js").build()
            val res = client.newCall(req).execute()

            val f = File(cacheDir, "js.bundle")
            if (!f.exists()) {
                f.createNewFile()
            }
            val ins = res.body()!!.byteStream()
            val out = FileOutputStream(f)

            var read = 0
            val buff = ByteArray(1024)
            while(true) {
                read = ins.read(buff)
                if(read <= 0) {
                    break
                }
                out.write(buff, 0, read)
            }

            ins.close()
            out.close()

            uiThread {
                MainApplication.jsBundle = f.absolutePath
                startActivity(Intent(application, MainActivity::class.java))
                finish()
            }
        }
    }
}
