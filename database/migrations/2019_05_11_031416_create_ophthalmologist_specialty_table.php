<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOphthalmologistSpecialtyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ophthalmologist_specialty', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('ophthalmologist_id');
            $table->unsignedBigInteger('specialty_id');
            $table->foreign('ophthalmologist_id')
                ->references('id')
                ->on('ophthalmologists')
                ->onDelete('restrict')
                ->onUpdate('restrict');
            $table->foreign('specialty_id')
                ->references('id')
                ->on('specialties')
                ->onDelete('restrict')
                ->onUpdate('restrict');
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
        Schema::dropIfExists('ophthalmologists_specialties');
    }
}
