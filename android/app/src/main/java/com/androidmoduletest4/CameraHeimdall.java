package com.androidmoduletest4;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.Camera;
import android.media.CamcorderProfile;
import android.media.MediaRecorder;
import android.os.Environment;
import android.support.v4.app.ActivityCompat;
import android.util.Log;
import android.view.Choreographer;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.FrameLayout;

import java.io.File;
import java.io.IOException;

public class CameraHeimdall extends FrameLayout implements MediaRecorder.OnInfoListener{
    private Context context;
    private Camera mCamera;
    private CameraPreview mPreview;
    //static final int REQUEST_VIDEO_CAPTURE = 1;

    static final int MAX_DURATION = 30000; // 최대 녹화 시간 30초

    int cameraIndex=0;
    Camera.CameraInfo cameraInfo = new Camera.CameraInfo();

    FrameLayout preview;

    static Boolean isRecording = false;
    static File file;
    static int cameraFacing = 0;

    MediaRecorder mediaRecorder;

    public CameraHeimdall(Context context) {
        super(context);
        this.context = context;
        initView();
    }

    private void initView() {
        LayoutInflater layoutInflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View v = layoutInflater.inflate(R.layout.layout, this, false);

        cameraIndex = 0;
        preview = v.findViewById(R.id.camera_heimdall);

        addView(v);
        String[] PERMISSIONS = {
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.RECORD_AUDIO,
                Manifest.permission.CAMERA
        };

        if(!hasPermissions(context, PERMISSIONS)){
            //ActivityCompat.requestPermissions(context, PERMISSIONS, PERMISSION_ALL);
            Log.e("MyComponent","need Permissions");
        }else{
            Log.e("MyComponent","pass Permissions");
            mCamera = CameraPreview.getCameraInstance(cameraIndex, cameraInfo);

            // Create our Preview view and set it as the content of our activity.
            mPreview = new CameraPreview(context, mCamera);

            preview.addView(mPreview);
        }

    }

    public static boolean hasPermissions(Context context, String... permissions) {
        if (context != null && permissions != null) {
            for (String permission : permissions) {
                if (ActivityCompat.checkSelfPermission(context, permission) != PackageManager.PERMISSION_GRANTED) {
                    return false;
                }
            }
        }
        return true;
    }

    public void cameraChange(){

        preview.removeView(mPreview);
        mCamera.release();

        cameraIndex++;
        mCamera = CameraPreview.getCameraInstance(cameraIndex, cameraInfo);
        Log.e("MyComponent","mCamera facing : "+ cameraInfo.facing);
        cameraFacing = cameraInfo.facing;

        mPreview = new CameraPreview(context, mCamera);
        preview.addView(mPreview);

        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long frameTimeNanos) {
                for (int i = 0; i < getChildCount(); i++) {
                    View child = getChildAt(i);
                    child.measure(MeasureSpec.makeMeasureSpec(getMeasuredWidth(), MeasureSpec.EXACTLY),
                            MeasureSpec.makeMeasureSpec(getMeasuredHeight(), MeasureSpec.EXACTLY));
                    child.layout(0, 0, child.getMeasuredWidth(), child.getMeasuredHeight());
                }
                getViewTreeObserver().dispatchOnGlobalLayout();
            }
        });
    }
    private Boolean recordStop(){
        // stop recording and release camera
        mediaRecorder.stop();  // stop the recording
        releaseMediaRecorder(); // release the MediaRecorder object
        mCamera.lock();         // take camera access back from MediaRecorder

        // inform the user that recording has stopped
        //setCaptureButtonText("Capture");
        isRecording = false;
        return isRecording;
    }

    public void record(){
        if (isRecording) {
            recordStop();
        } else {
            // initialize video camera
            if (prepareVideoRecorder()) {
                // Camera is available and unlocked, MediaRecorder is prepared,
                // now you can start recording
                mediaRecorder.start();

                // inform the user that recording has started
                //setCaptureButtonText("Stop");
                isRecording = true;
            } else {
                // prepare didn't work, release the camera
                releaseMediaRecorder();
                // inform user
            }
        }
    }
    private boolean prepareVideoRecorder(){

        File directory = new File(Environment.getExternalStorageDirectory().getAbsolutePath()+"/test");

        if(!directory.exists()&& !directory.isDirectory()){
            Log.d("make directory", "prepareVideoRecorder: ");
            if(directory.mkdirs()){

            }else{
                Log.e("create directory fail", "prepareVideoRecorder: ");
                return false;
            }
        }
        file = new File(Environment.getExternalStorageDirectory().getAbsolutePath()+"/test/test.mp4");

        mCamera = CameraPreview.getCameraInstance(cameraIndex, cameraInfo);
        mCamera.setDisplayOrientation(90);
        mediaRecorder = new MediaRecorder();

        // Step 1: Unlock and set camera to MediaRecorder
        mCamera.unlock();
        mediaRecorder.setCamera(mCamera);

        // Step 2: Set sources
        mediaRecorder.setAudioSource(MediaRecorder.AudioSource.CAMCORDER);
        mediaRecorder.setVideoSource(MediaRecorder.VideoSource.CAMERA);

        // Step 3: Set a CamcorderProfile (requires API Level 8 or higher)
        mediaRecorder.setProfile(CamcorderProfile.get(CamcorderProfile.QUALITY_HIGH));

        // Step 4: Set output file
        mediaRecorder.setOutputFile(file.getPath());

        // Step 5: Set the preview output
        mediaRecorder.setPreviewDisplay(mPreview.getHolder().getSurface());

        //mediaRecorder.setMaxDuration(MAX_DURATION);
        mediaRecorder.setOnInfoListener(this::onInfo);

        // Step 6: Prepare configured MediaRecorder
        try {

            mediaRecorder.prepare();
        } catch (IllegalStateException e) {
            Log.d("gyubeom", "IllegalStateException preparing MediaRecorder: " + e.getMessage());
            releaseMediaRecorder();
            return false;
        } catch (IOException e) {
            Log.d("gyubeom", "IOException preparing MediaRecorder: " + e.getMessage());
            releaseMediaRecorder();
            return false;
        }
        return true;
    }
    private void releaseMediaRecorder(){
        if (mediaRecorder != null) {
            mediaRecorder.reset();   // clear recorder configuration
            mediaRecorder.release(); // release the recorder object
            mediaRecorder = null;
            mCamera.lock();           // lock camera for later use
        }
    }

    @Override
    public void onInfo(MediaRecorder mr, int what, int extra) {
        Log.e("MyComponent","record is stop because time is up");
        recordStop();
    }
}