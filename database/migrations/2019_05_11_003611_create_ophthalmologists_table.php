<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOphthalmologistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ophthalmologists', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('adresse_line1');
            $table->text('adresse_line2');
            $table->string('cp',20);
            $table->string('ville',50);
            $table->string('tele',20);
            $table->boolean('partenaire_acuvue')->default(false);
            $table->double('lat');
            $table->double('lng');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ophthalmologists');
    }
}
