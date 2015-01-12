package com.example.nina.townconqueror;

/*import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;*/

import android.os.Bundle;
import org.apache.cordova.*;
import org.apache.cordova.Config;
import org.apache.cordova.DroidGap;


public class MainActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.loadUrl(Config.getStartUrl());
        super.loadUrl("file:///android_asset/www/index.html");
    }
}