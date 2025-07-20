package com.bytemagic.reachapp

import android.app.Activity
import android.content.ComponentName
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResult
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts.StartActivityForResult
import com.facebook.react.bridge.*

class IntentLauncherModule(private val reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    companion object {
        const val NAME = "IntentLauncher"
        const val REQUEST_CODE = 12
        const val ATTR_ACTION = "action"
        const val ATTR_TYPE = "type"
        const val ATTR_CATEGORY = "category"
        const val TAG_EXTRA = "extra"
        const val ATTR_DATA = "data"
        const val ATTR_FLAGS = "flags"
        const val ATTR_PACKAGE_NAME = "packageName"
        const val ATTR_CLASS_NAME = "className"
    }

    private var promise: Promise? = null
    private var activityResultLauncher: ActivityResultLauncher<Intent>? = null

    init {
        reactContext.addActivityEventListener(this)
        // Only initialize ActivityResultLauncher if the activity is a ComponentActivity
        (reactContext.currentActivity as? ComponentActivity)?.let { componentActivity ->
            activityResultLauncher =
                    componentActivity.registerForActivityResult(StartActivityForResult()) {
                            result: ActivityResult ->
                        handleActivityResult(result)
                    }
        }
    }

    override fun getName(): String {
        return NAME
    }

    override fun onNewIntent(intent: Intent?) {
        // Handle new intents if needed
    }

    @ReactMethod
    fun startActivity(params: ReadableMap, promise: Promise) {
        this.promise = promise
        val intent = Intent()

        if (params.hasKey(ATTR_CLASS_NAME)) {
            val cn: ComponentName =
                    if (params.hasKey(ATTR_PACKAGE_NAME)) {
                        ComponentName(
                                params.getString(ATTR_PACKAGE_NAME) ?: "",
                                params.getString(ATTR_CLASS_NAME) ?: ""
                        )
                    } else {
                        ComponentName(
                                reactApplicationContext,
                                params.getString(ATTR_CLASS_NAME) ?: ""
                        )
                    }
            intent.component = cn
        }

        if (params.hasKey(ATTR_ACTION)) {
            intent.action = params.getString(ATTR_ACTION)
        }

        if (params.hasKey(ATTR_DATA) && params.hasKey(ATTR_TYPE)) {
            intent.setDataAndType(
                    Uri.parse(params.getString(ATTR_DATA)),
                    params.getString(ATTR_TYPE)
            )
        } else {
            if (params.hasKey(ATTR_DATA)) {
                intent.data = Uri.parse(params.getString(ATTR_DATA))
            }
            if (params.hasKey(ATTR_TYPE)) {
                intent.type = params.getString(ATTR_TYPE)
            }
        }

        if (params.hasKey(TAG_EXTRA)) {
            val extras = Arguments.toBundle(params.getMap(TAG_EXTRA))
            if (extras != null) {
                extras.putString("chart", "ETDRS")
                extras.putInt("row", 6)
                extras.putBoolean("crowding", true)
                extras.putDouble("crowdingSpacer", 1.0)
                extras.putString("currentEye", "OD")
                extras.putBoolean("screenBothEyes", true)
                intent.putExtras(extras)
            }
        }

        if (params.hasKey(ATTR_FLAGS)) {
            intent.addFlags(params.getInt(ATTR_FLAGS))
        }

        if (params.hasKey(ATTR_CATEGORY)) {
            intent.addCategory(params.getString(ATTR_CATEGORY))
        }

        // Check if ActivityResultLauncher is available, else fallback to startActivityForResult
        if (activityResultLauncher != null) {
            activityResultLauncher?.launch(intent)
        } else {
            reactContext.currentActivity?.startActivityForResult(intent, REQUEST_CODE)
        }
    }

    @ReactMethod
    fun isAppInstalled(packageName: String, promise: Promise) {
        try {
            reactContext.packageManager.getPackageInfo(packageName, 0)
            promise.resolve(true)
        } catch (e: PackageManager.NameNotFoundException) {
            promise.resolve(false)
            //  promise.reject("Not Installed")
        }
    }

    @ReactMethod
    fun startAppByPackageName(packageName: String?, promise: Promise) {
        if (packageName != null) {
            val launchIntent = reactContext.packageManager.getLaunchIntentForPackage(packageName)
            if (launchIntent != null) {
                reactApplicationContext.startActivity(launchIntent)
                promise.resolve(true)
            } else {
                promise.reject("could not start app")
            }
        } else {
            promise.reject("package name missing")
        }
    }

    private fun handleActivityResult(result: ActivityResult) {
        val params = Arguments.createMap()

        if (result.data != null) {
            params.putInt("resultCode", result.resultCode)
            val data = result.data?.data
            if (data != null) {
                params.putString("data", data.toString())
            }
            val extras = result.data?.extras
            if (extras != null) {
                params.putMap("extra", Arguments.fromBundle(extras))
            }
        }
        promise?.resolve(params)
    }

    // Fallback for non-ComponentActivity or older versions
    override fun onActivityResult(
            activity: Activity?,
            requestCode: Int,
            resultCode: Int,
            data: Intent?
    ) {
        if (requestCode == REQUEST_CODE) {
            val params = Arguments.createMap()

            if (data != null) {
                params.putInt("resultCode", resultCode)
                val uriData = data.data
                if (uriData != null) {
                    params.putString("data", uriData.toString())
                }
                val extras = data.extras
                if (extras != null) {
                    params.putMap("extra", Arguments.fromBundle(extras))
                }
            }
            promise?.resolve(params)
        }
    }
}
