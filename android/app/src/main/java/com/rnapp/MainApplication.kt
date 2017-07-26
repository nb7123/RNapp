package com.rnapp

import android.app.Application
import android.content.Intent

import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader
import org.jetbrains.anko.async
import java.io.File
import java.io.FileOutputStream

import java.util.Arrays

class MainApplication : Application(), ReactApplication {
    companion object {
        var jsBundle: String? = ""
    }

    private val mReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
//            return false
            return BuildConfig.DEBUG
        }

        override fun getJSBundleFile(): String? {
            return super.getJSBundleFile()
//            return jsBundle
        }

        override fun getBundleAssetName(): String? {
//            return null
            return "android.bundle"
        }

        override fun getPackages(): List<ReactPackage> {
            return Arrays.asList(
                    MainReactPackage(),
                    ExamplePackage()
            )
        }

//        override fun createReactInstanceManager(): ReactInstanceManager {
//            val mgr = super.createReactInstanceManager()
//            mgr.addReactInstanceEventListener { ReactInstanceManager.ReactInstanceEventListener{
//                startActivity(Intent(application, MainActivity::class.java))
//            } }
//            mgr.createReactContextInBackground()
//            return mgr
//        }
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return mReactNativeHost
    }

    override fun onCreate() {
        super.onCreate()

        SoLoader.init(this, /* native exopackage */ false)
    }

    fun initJSBundle() {

    }
}
