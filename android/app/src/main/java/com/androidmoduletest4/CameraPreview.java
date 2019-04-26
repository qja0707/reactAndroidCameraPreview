package com.androidmoduletest4;

import android.content.Context;
import android.hardware.Camera;
import android.location.LocationManager;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;

import java.io.IOException;

import static android.content.ContentValues.TAG;

public class CameraPreview extends SurfaceView implements SurfaceHolder.Callback {
    private SurfaceHolder mHolder;
    private Camera mCamera;

    public CameraPreview(Context context, Camera camera) {
        super(context);
        mCamera = camera;
        
        Log.e("MyComponent", "camera preview");

        // Install a SurfaceHolder.Callback so we get notified when the
        // underlying surface is created and destroyed.
        mHolder = getHolder();
        mHolder.addCallback(this);
        // deprecated setting, but required on Android versions prior to 3.0
        mHolder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
    }

    public void surfaceCreated(SurfaceHolder holder) {
        // The Surface has been created, now tell the camera where to draw the preview.

        Log.e("MyComponent", "surface Created");
        try {
            //change resolution to 1280 * 720
            mCamera.stopPreview();

            Camera.Parameters parameters = mCamera.getParameters();
            //parameters.setVideoS(1280,720);
            parameters.setPreviewSize(1280,720);
            mCamera.setParameters(parameters);

            mCamera.setPreviewDisplay(holder);
            mCamera.startPreview();
        } catch (IOException e) {
            Log.e("MyComponent", "Error setting camera preview: " + e.getMessage());
        }
    }

    public void surfaceDestroyed(SurfaceHolder holder) {
        // empty. Take care of releasing the Camera preview in your activity.
        Log.e("MyComponent", "surface Destroyed");
        try {
            mCamera.stopPreview();
        } catch (Exception e){
            // ignore: tried to stop a non-existent preview
        }
    }

    public void surfaceChanged(SurfaceHolder holder, int format, int w, int h) {

        // If your preview can change or rotate, take care of those events here.
        // Make sure to stop the preview before resizing or reformatting it.

        Log.e("MyComponent", "surface Changed w:"+w+", h:"+h+" foramt: "+format);
        if (mHolder.getSurface() == null){
            // preview surface does not exist
            return;
        }
        // stop preview before making changes
        try {
            mCamera.stopPreview();
        } catch (Exception e){
            // ignore: tried to stop a non-existent preview
        }

        // set preview size and make any resize, rotate or
        // reformatting changes here

        // start preview with new settings
        try {
            mCamera.setPreviewDisplay(mHolder);
            mCamera.startPreview();

        } catch (Exception e){
            Log.d(TAG, "Error starting camera preview: " + e.getMessage());
        }

    }


    /** A safe way to get an instance of the Camera object. */
    public static Camera getCameraInstance(int camera, Camera.CameraInfo cameraInfo){
        // Assume thisActivity is the current activity
        Camera c = null;
        Camera.Parameters parameters = null;
        System.out.println(c.getNumberOfCameras());
        try {
            c = Camera.open(camera%c.getNumberOfCameras()); // attempt to get a Camera instance
            parameters = c.getParameters();

            c.setDisplayOrientation(90);
            c.getCameraInfo(camera%c.getNumberOfCameras(),cameraInfo);
            parameters.setFocusMode(Camera.Parameters.FOCUS_MODE_CONTINUOUS_VIDEO);
            c.setParameters(parameters);
            Log.e("MyComponent","camera good : "+ c);

        }
        catch (Exception e){
            Log.e("MyComponent","get camera exception: "+e.getMessage());
        }
        for (Camera.Size size: c.getParameters().getSupportedPictureSizes()
             ) {
            Log.e("MyComponent","supported picture size : "+size.height+" , "+size.width);
        }


        return c; // returns null if camera is unavailable
    }
}
